<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AdvertisementResource\Pages;
use App\Models\Advertisement;
use App\Models\Image;
use Carbon\Carbon;
use Filament\Forms;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;

use function Laravel\Prompts\form;

class AdvertisementResource extends Resource
 {
    protected static ?string $model = Advertisement::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard';
    protected static ?string $navigationGroup = 'Advertisments';

     public static function getNavigationBadge(): ?string {
        return Advertisement::whereDate( 'created_at', Carbon::today() )->count();
    }
    public static function getNavigationBadgeTooltip(): ?string
    {
        return 'Today Advertisments';
    }

    public static function form( Form $form ): Form
 {
        return $form
     ->schema([
    Card::make([
        Grid::make(2)->schema([

            Forms\Components\Select::make('user_id')
                ->label('User Name')
                ->relationship('user', 'first_name')
                ->required(),

                Forms\Components\TextInput::make('title')
                ->label('Title')
                ->required()
                ->maxLength(255),

                Forms\Components\TextInput::make('address')
                ->label('Address')
                ->maxLength(255),

            Forms\Components\Select::make('main_category_id')
                ->label('Main Category')
                ->relationship('mainCategory', 'category_name')
                ->reactive()
                ->required(),

            Forms\Components\Select::make('sub_category_id')
                ->label('Sub Category')
                ->options(function (callable $get) {
                    $mainCategoryId = $get('main_category_id');
                    return $mainCategoryId
                        ? \App\Models\SubCategory::where('main_category_id', $mainCategoryId)->pluck('sub_category_name', 'id')
                        : [];
                })
                ->required()
                ->preload(),

            Forms\Components\Select::make('province_id')
                ->label('Province')
                ->relationship('province', 'province')
                ->reactive()
                ->required(),

            Forms\Components\Select::make('districts_id')
                ->label('District')
                ->options(function (callable $get) {
                    $provinceId = $get('province_id');
                    return $provinceId
                        ? \App\Models\District::where('province_id', $provinceId)->pluck('district', 'id')
                        : [];
                })
                ->required()
                ->reactive()
                ->preload(),

            Forms\Components\Select::make('divisions_id')
                ->label('Division')
                ->options(function (callable $get) {
                    $districtId = $get('districts_id');
                    return $districtId
                        ? \App\Models\Division::where('district_id', $districtId)->pluck('division', 'id')
                        : [];
                })
                ->required()
                ->preload(),

            Forms\Components\TextInput::make('address')
                ->label('Address')
                ->maxLength(255),

            Forms\Components\TextInput::make('price')
                ->label('Price')
                ->required()
                ->numeric()
                ->prefix('Rs'),

            Grid::make(2)->schema([
                Forms\Components\Toggle::make('active')
                    ->label('Active')
                    ->required(),

                Forms\Components\Toggle::make('featured')
                    ->label('Featured')
                    ->required(),
            ]),

        ]),
    ]),

    Card::make([
        RichEditor::make('description')
    ->label('Description')
    ->required()
    ->columnSpanFull(),
    ]),

    Card::make([
        FileUpload::make('images')
            ->label('Images')
            ->multiple()
            ->reorderable()
            ->directory('ads/images')
            ->preserveFilenames()
            ->enableOpen()
            ->columnSpanFull()
            ->storeFiles(),
            ])
]);
    }

    public static function table( Table $table ): Table
 {
        return $table
        ->columns( [
            Tables\Columns\TextColumn::make( 'user.first_name' )
            ->label( 'User' )
            ->numeric()
            ->searchable()
            ->sortable(),
            Tables\Columns\TextColumn::make( 'title' )
            ->label( 'Title' )
            ->limit( 20 )
            ->searchable(),
            Tables\Columns\TextColumn::make( 'price' )
            ->label( 'Price' )
            ->money()
            ->sortable(),
            Tables\Columns\TextColumn::make( 'mainCategory.category_name' )
            ->label( 'Category' )
            ->numeric()
            ->sortable(),
            Tables\Columns\TextColumn::make( 'subCategory.sub_category_name' )
            ->label( 'Sub Category' )
            ->numeric()
            ->toggleable( isToggledHiddenByDefault: true )
            ->sortable(),
            Tables\Columns\TextColumn::make( 'province.province' )
            ->label( 'Province' )
            ->numeric()
            ->sortable(),
            Tables\Columns\TextColumn::make( 'district.district' )
            ->label( 'District' )
            ->numeric()
            ->toggleable( isToggledHiddenByDefault: true )
            ->sortable(),
            Tables\Columns\TextColumn::make( 'division.division' )
            ->label( 'Division' )
            ->numeric()
            ->toggleable( isToggledHiddenByDefault: true )
            ->sortable(),
            Tables\Columns\TextColumn::make( 'address' )
            ->label( 'Addres' )
            ->toggleable( isToggledHiddenByDefault: true )
            ->searchable(),

            Tables\Columns\ToggleColumn::make( 'active' )
            ->label( 'Status' ),
            Tables\Columns\ToggleColumn::make( 'featured' )
            ->label( 'Featured' ),
            Tables\Columns\TextColumn::make( 'created_at' )
            ->dateTime()
            ->sortable()
            ->toggleable( isToggledHiddenByDefault: true ),
            Tables\Columns\TextColumn::make( 'updated_at' )
            ->dateTime()
            ->sortable()
            ->toggleable( isToggledHiddenByDefault: true ),
        ] )
        ->filters( [
            Filter::make('created_at')
            ->form([
                Forms\Components\DatePicker::make('created_from')->label('Created From'),
                Forms\Components\DatePicker::make('created_until')->label('Created Until'),
            ])
            ->query(function ($query, array $data) {
                return $query
                    ->when($data['created_from'], fn($q) => $q->whereDate('created_at', '>=', $data['created_from']))
                    ->when($data['created_until'], fn($q) => $q->whereDate('created_at', '<=', $data['created_until']));
            }),
        ] )
        ->actions( [
            Tables\Actions\DeleteAction::make(),
        ] )
        ->bulkActions( [
            Tables\Actions\BulkActionGroup::make( [
                Tables\Actions\DeleteBulkAction::make(),
            ] ),
        ] );
    }

    public static function getRelations(): array
 {
        return [
            //
        ];
    }

    public static function getPages(): array
 {
        return [
            'index' => Pages\ListAdvertisements::route( '/' ),
            'create' => Pages\CreateAdvertisement::route( '/create' ),
            'edit' => Pages\EditAdvertisement::route( '/{record}/edit' ),
        ];
    }

    public static function afterCreate($record, array $data): void
{
    if (isset($data['images']) && is_array($data['images'])) {
        foreach ($data['images'] as $imagePath) {
            Image::create([
                'advertisement_id' => $record->id,
                'image_path' => $imagePath,
            ]);
        }
    }
}
public static function afterUpdate($record, array $data): void
{
    $record->images()->delete();

    if (isset($data['images']) && is_array($data['images'])) {
        foreach ($data['images'] as $imagePath) {
            Image::create([
                'advertisement_id' => $record->id,
                'image_path' => $imagePath,
            ]);
        }
    }
}
}
