<?php

namespace App\Filament\Resources\AdsResource\Pages;

use App\Filament\Resources\AdsResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAds extends EditRecord
{
    protected static string $resource = AdsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
