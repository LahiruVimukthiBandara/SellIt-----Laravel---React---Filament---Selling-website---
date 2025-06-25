<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SubCategoryResource\Pages;
use App\Filament\Resources\SubCategoryResource\RelationManagers;
use App\Models\SubCategory;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SubCategoryResource extends Resource {
    protected static ?string $model = SubCategory::class;

    protected static ?string $navigationIcon = 'heroicon-o-queue-list';
    protected static ?string $navigationGroup = 'Categories';

    public static function form( Form $form ): Form {
        return $form
        ->schema( [
            Select::make( 'main_category_id' )
            ->relationship( 'mainCategory', 'category_name' )
            ->required(),
            TextInput::make( 'sub_category_name' )
            ->required()
        ] );
    }

    public static function table( Table $table ): Table {
        return $table
        ->columns( [
            TextColumn::make( 'mainCategory.category_name' )
            ->label( 'Main Category' )
            ->sortable()
            ->searchable(),
            TextColumn::make( 'sub_category_name' )
            ->label( 'Sub Category' )
            ->sortable()
            ->searchable(),
        ] )
        ->filters( [
            //
        ] )
        ->actions( [
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
        ] )
        ->bulkActions( [
            Tables\Actions\BulkActionGroup::make( [
                Tables\Actions\DeleteBulkAction::make(),
            ] ),
        ] );
    }

    public static function getPages(): array {
        return [
            'index' => Pages\ManageSubCategories::route( '/' ),
        ];
    }
}
