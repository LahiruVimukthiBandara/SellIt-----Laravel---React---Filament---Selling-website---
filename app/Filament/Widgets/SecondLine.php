<?php

namespace App\Filament\Widgets;

use App\Models\Advertisement;
use Filament\Widgets\ChartWidget;

class SecondLine extends ChartWidget {
    protected static ?string $heading = 'Ads Per Month';
    protected static ?int $sort = 2;

    protected function getData(): array {
        $year = now()->year;

        $ads = Advertisement::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', $year)
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        $monthlyCounts = collect(range(1, 12))->map(function ($month) use ($ads) {
            return $ads[$month] ?? 0;
        });
        return [
            'datasets' => [
                [
                    'label' => 'Posts Created',
                    'data' => $monthlyCounts,
                    'borderColor' => '#10b981',
                    'backgroundColor' => 'rgba(16,185,129,0.3)',
                ],
            ],
            'labels' => [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ],
        ];
    }

    protected function getType(): string {
        return 'line';
    }
}
