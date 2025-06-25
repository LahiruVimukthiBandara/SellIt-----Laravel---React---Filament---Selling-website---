<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\Pages\CreateUser;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Carbon\Carbon;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Pages\Page;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class UserResource extends Resource {
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'Users';

    public static function getNavigationBadge(): ?string {
        return User::whereDate( 'created_at', Carbon::today() )->count();
    }
    public static function getNavigationBadgeTooltip(): ?string {
        return 'Today Users';
    }

    public static function form( Form $form ): Form {
        return $form
        ->schema( [
            TextInput::make( 'first_name' )->required()->maxLength( 255 ),
            TextInput::make( 'last_name' )->required()->maxLength( 255 ),
            TextInput::make( 'email' )->email()->required()->maxLength( 255 ),
            TextInput::make( 'phone' )->required()->maxLength( 20 ),
            Toggle::make( 'is_admin' )->required(),

        ] );
    }

    public static function table( Table $table ): Table {
        return $table
        ->columns( [
            TextColumn::make( 'first_name' )->sortable()->searchable(),
            TextColumn::make( 'last_name' )->sortable()->searchable(),
            TextColumn::make( 'email' )->sortable()->searchable(),
            TextColumn::make( 'phone' )->sortable(),
            TextColumn::make( 'is_admin' )->sortable(),
            TextColumn::make( 'created_at' )->dateTime(),
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
            'index' => Pages\ListUsers::route( '/' ),
            'create' => Pages\CreateUser::route( '/create' ),
            'edit' => Pages\EditUser::route( '/{record}/edit' ),
        ];
    }
}
