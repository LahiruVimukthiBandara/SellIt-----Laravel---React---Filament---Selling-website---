<?php

namespace App\Filament\Widgets;

use App\Models\Advertisement;
use App\Models\MainCategory;
use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class UsersWidget extends BaseWidget {
    protected function getStats(): array {
        $userCount = User::count();
        $todayUserCount = User::whereDate( 'created_at', Carbon::today() )->count();

        $adCount = Advertisement::count();
        $todayAdCount = Advertisement::whereDate( 'created_at', Carbon::today() )->count();

        $categoryCount = MainCategory::count();

        return [
            Stat::make( 'Users', $userCount )
            ->description( "{$todayUserCount} new today" )
            ->descriptionIcon( 'heroicon-m-arrow-trending-up' )
            ->color( 'success' )
            ->chart( [ 4, 6, 8, 3, 7, 5, $todayUserCount ] ),

            Stat::make( 'Ads', $adCount )
            ->description( "{$todayAdCount} new today" )
            ->descriptionIcon( 'heroicon-m-arrow-trending-up' )
            ->color( 'warning' )
            ->chart( [ 4, 6, 8, 3, 7, 5, $todayAdCount ] ),

            Stat::make( 'Categories', $categoryCount )
            ->descriptionIcon( 'heroicon-m-arrow-trending-up' )
            ->color( 'info' )
            ->chart( [ 4, 6, 8, 3, 7, 5, $categoryCount ] ),

        ];
    }
}
