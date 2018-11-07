<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TestScenario;

class TestScenarioController extends Controller
{
    //
    public function getPassed($moduleId) {
        $result = 0;
        foreach(
        TestScenario::whereColumn([
            ['module_id', '=', $moduleId],
            ['status', '=', '1']
            ])->cursor() as $scenario) {
                $result = $result + 1;
        }
        $total = TestScenario::where('module_id', $moduleId)->count();
        return ($result / $total) * 100;
    }

    public function getFailed($moduleId) {
        $result = 0;
        foreach(
        TestScenario::whereColumn([
            ['module_id', '=', $moduleId],
            ['status', '=', '0']
            ])->cursor() as $scenario) {
                $result = $result + 1;
        }
        $total = TestScenario::where('module_id', $moduleId)->count();
        return ($result / $total) * 100;
    }

    public function getSkipped($moduleId) {
        $result = 0;
        foreach(
        TestScenario::whereColumn([
            ['module_id', '=', $moduleId],
            ['status', '=', '2']
            ])->cursor() as $scenario) {
                $result = $result + 1;
        }
        $total = TestScenario::where('module_id', $moduleId)->count();
        return ($result / $total) * 100;
    }
}
