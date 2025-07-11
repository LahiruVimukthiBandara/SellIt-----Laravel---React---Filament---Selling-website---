<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AdsResource\Pages;
use App\Filament\Resources\AdsResource\RelationManagers;
use App\Models\Ads;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AdsResource extends Resource {
    protected static ?string $model = Ads::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $navigationGroup = 'Advertisments';
    public static function form( Form $form ): Form {
        return $form
        ->schema( [
            Forms\Components\Grid::make( 2 )
            ->schema( [
                Forms\Components\Card::make()
                ->schema( [
                    Forms\Components\TextInput::make( 'company' )
                    ->label( 'Company Name' )
                    ->required()
                    ->maxLength( 255 ),

                ] ),

                Forms\Components\Card::make()
                ->schema( [
                    Forms\Components\FileUpload::make( 'image_path' )
                    ->label( 'Image' )
                    ->previewable()
                    ->image()
                    ->required(),
                    Forms\Components\Toggle::make( 'active' )
                    ->required(),
                ] ),
            ] ),
        ] );

    }

    public static function table( Table $table ): Table {
        return $table
        ->columns( [
            Tables\Columns\TextColumn::make( 'company' )
            ->label( 'Company NAME' )
            ->searchable(),
            Tables\Columns\ImageColumn::make( 'image_path' ),
            Tables\Columns\ToggleColumn::make( 'active' )
            ,
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
            //
        ] )
        ->actions( [
            Tables\Actions\EditAction::make(),
        ] )
        ->bulkActions( [
            Tables\Actions\BulkActionGroup::make( [
                Tables\Actions\DeleteBulkAction::make(),
            ] ),
        ] );
    }

    public static function getRelations(): array {
        return [
            //
        ];
    }

    public static function getPages(): array {
        return [
            'index' => Pages\ListAds::route( '/' ),
            'create' => Pages\CreateAds::route( '/create' ),
            'edit' => Pages\EditAds::route( '/{record}/edit' ),
        ];
    }
}
