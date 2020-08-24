<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Task;

class AdminController extends Controller
{

    public function createTask (Request $request) {

        $request->validate([
            'task_title' => 'required',
            'task_details' => 'required',
        ]);

        $task = new Task();
        $task->title = $request->task_title;
        $task->details = $request->task_details;
        $task->save();
        return response()->json(['task' => $task],201);
    }

    public function editTask(Request $request) {

        $request->validate([
            'task_id' => 'required',
            'task_title' => 'required',
            'task_details' => 'required',
        ]);
        $task = Task::find($request->task_id);
        if($task == null){
            return response()->json(['error' => 'Task Not Found'],400);
        }

        $task->title = $request->task_title;
        $task->details = $request->task_details;
        $task->save();
        return response()->json(['response' => Task::all()],200);
    }

    public function deleteTask(Request $request) {
        $request->validate([
            'taskId' => 'required',
        ]);
        $task = Task::find($request->taskId);
        if($task == null){
            return response()->json(['error' => 'Task Not Found'],400);
        }
        $task->delete();
        return response()->json(['response' => 'success'],200);
    }

    public function fetchAllTask() {
        $task = Task::all();
        return response()->json(['response' => $task],200);
    }

    public function fetchRecentTask() {
        $task = Task::latest()->paginate(10);
        return response()->json(['response' => $task],200);
    }

}
