import { Injectable } from "@nestjs/common";
import { Board } from "../board.interface";
import { RequestBoard } from "../dto/board.resquestboard";
import { taskService } from "src/modules/task/Service/task.service";
import { taskCreate } from "src/modules/task/dto/create-taskdto";

@Injectable()
export class BoardService {
    private boards: Board[] = [];
    private tasks: taskService

    async create(boardData: RequestBoard): Promise<Board> {
        const newboard: Board = {id: Date.now().toString(),
        name: boardData.name,
        members: [],
        task: []
      }
      this.boards.push(newboard);
      return await newboard;
    }

    async addmember(boardId: string, userId: string): Promise<Board> {
        const board = await this.boards.find(b => b.id === boardId);
        if (!board){ 
            throw new Error(`Board ${boardId} not found`);
          }
        board.members.push(userId)
        return await board;
     }

    async find(): Promise<Board[]> {
          return await this.boards;
      }

    async addTask(boardId: string, dto: taskCreate){
        const board = this.boards.find(b => b.id === boardId);
        if(!board){
            throw new Error("Board no encontrado");
          }
        else{
            const newTask = await this.tasks.create(dto);
            board.task.push(newTask)
            return board;
          }
      }

    async removeTask(boardId: string, taskname: string){
          const board = this.boards.find(b => b.id === boardId);
          if(!board){
              throw new Error("Board no encontrado");
            }
          else{
            const task = board.task.findIndex(b => b.name === taskname);
            if(task === -1){
                  throw new Error("tarea no encontrada");
              }
            else{
                board.task.splice(task,1)
              }
          }
          return board
        }

    async editTask(boardId: string, taskName: string, newName?: string, newDescription?: string) {
          const board = this.boards.find(b => b.id === boardId);
          if (!board) {
                throw new Error("Board no encontrado");
            }
          const task = board.task.find(t => t.name === taskName);
          if (!task) {
                throw new Error("Tarea no encontrada");
            }
          if(newName){
                this.tasks.editName(task,newName);
            }
          if(newDescription){
                this.tasks.editDescription(task,newDescription);
            }

          return board
        }
 
};