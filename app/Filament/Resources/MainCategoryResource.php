<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MainCategoryResource\Pages;
use App\Filament\Resources\MainCategoryResource\RelationManagers;
use App\Models\MainCategory;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MainCategoryResource extends Resource {
    protected static ?string $model = MainCategory::class;

    protected static ?string $navigationIcon = 'heroicon-o-tag';
    protected static ?string $navigationGroup = 'Categories';

    public static function form( Form $form ): Form {
        return $form
        ->schema( [
            TextInput::make( 'category_name' )
        ] );
    }

    public static function table( Table $table ): Table {
        return $table
        ->columns( [
            TextColumn::make( 'category_name' )
            ->label( 'Category Name' )
            ->sortable()
            ->searchable(),

            TextColumn::make( 'created_at' )
            ->label( 'Created Date' )
            ->dateTime()
            ->sortable(),
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
            'index' => Pages\ManageMainCategories::route( '/' ),
        ];
    }
}
