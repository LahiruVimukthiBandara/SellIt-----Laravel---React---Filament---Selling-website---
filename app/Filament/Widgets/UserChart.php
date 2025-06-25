<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\ChartWidget;

class UserChart extends ChartWidget {
    protected static ?string $heading = 'Usrs Per Month';
    protected static ?int $sort = 2;

    protected function getData(): array {
        $year = now()->year;

        $users = User::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', $year)
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        $monthlyCounts = collect(range(1, 12))->map(function ($month) use ($users) {
            return $users[$month] ?? 0;
        });
        return [
            'datasets' => [
                [
                    'label' => 'Posts Created',
                    'data' => $monthlyCounts,
                    'borderColor' => '#f59e0b',
                    'backgroundColor' => 'rgba(245,158,11,0.3)',
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
