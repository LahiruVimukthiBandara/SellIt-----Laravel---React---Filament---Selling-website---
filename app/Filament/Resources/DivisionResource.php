<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DivisionResource\Pages;
use App\Filament\Resources\DivisionResource\RelationManagers;
use App\Models\Division;
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

class DivisionResource extends Resource {
    protected static ?string $model = Division::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrows-pointing-in';
    protected static ?string $navigationGroup = 'Locations';

    public static function form( Form $form ): Form {
        return $form
        ->schema( [
            Select::make( 'district_id' )
            ->label( 'District' )
            ->relationship( 'district', 'district' ),

            TextInput::make( 'division' )
            ->label( 'Division' ),
        ] );
    }

    public static function table( Table $table ): Table {
        return $table
        ->columns( [
            TextColumn::make( 'division' )
            ->label( 'Division' )
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
            'index' => Pages\ManageDivisions::route( '/' ),
        ];
    }
}
