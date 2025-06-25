<?php

namespace App\Filament\Resources\MainCategoryResource\Pages;

use App\Filament\Resources\MainCategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageMainCategories extends ManageRecords
{
    protected static string $resource = MainCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
