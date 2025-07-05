import { ApiException } from "../ApiException";
import { Api } from "../ApiConfig";

export interface ITask {
    id: number;
    title: String;
    isCompleted: boolean;
}

//método para buscar todos
const getAll = async (): Promise<ITask | ApiException> => {
    //Promise<> significa que vai retornar tarefa ou a exceção
    try{
        const { data } = await Api().get('/tasks'); // aguarda essa resposta pra depois listar
        return data;
    }catch(error: any){
        return new ApiException(error.message || 'Erro ao pesquisar as tarefas');
    }
  
}
//método para buscar um
const getById = async (id: number): Promise<ITask | ApiException> => {
    try{
        const { data } = await Api().get(`/tasks/${id}`); 
        return data;
    }catch(error: any){
        return new ApiException(error.message || 'Pesquisa não encontrada! Tente outra pesquisa');
    }  
};

//método para inserir no BD
const create  = async (dataToCreate: Omit<ITask, 'id'>): Promise<ITask | ApiException> => {
    try{
        const { data } = await Api().post('/tasks', dataToCreate); 
        return data;
    }catch(error: any){
        return new ApiException(error.message || 'Pesquisa não encontrada! Tente outra pesquisa');
    }  
};

//método para atualizar no BD
const updateById  = async (id: number, dataToUpdate: ITask): Promise<ITask | ApiException> => {
    try{
        const { data } = await Api().put(`/tasks/${id}`, dataToUpdate); 
        return data;
    }catch(error: any){
        return new ApiException(error.message || 'Erro ao alterar a tarefa!Tente novamente!');
    }  
};
    
//método para deletar do BD
const deleteById  = async (id: number): Promise<undefined | ApiException> => {
    try{
        await Api().delete(`/tasks/${id}`); 
        return undefined;
    }catch(error: any){
        return new ApiException(error.message || 'Erro ao deletar a tarefa!Tente novamente!');
    }  
};

export const TasksService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};