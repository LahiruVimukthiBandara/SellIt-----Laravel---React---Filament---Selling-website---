<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DistrictResource\Pages;
use App\Filament\Resources\DistrictResource\RelationManagers;
use App\Models\District;
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

class DistrictResource extends Resource {
    protected static ?string $model = District::class;

    protected static ?string $navigationIcon = 'heroicon-o-map-pin';
    protected static ?string $navigationGroup = 'Locations';

    public static function form( Form $form ): Form {
        return $form
        ->schema( [
            Select::make( 'province_id' )
            ->label( 'Province' )
            ->relationship( 'province', 'province' ),

            TextInput::make( 'district' )
            ->label( 'District' ),
        ] );
    }

    public static function table( Table $table ): Table {
        return $table
        ->columns( [
            TextColumn::make( 'district' )
            ->searchable()
            ->label( 'District' )
            ->sortable(),

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
            'index' => Pages\ManageDistricts::route( '/' ),
        ];
    }
}
