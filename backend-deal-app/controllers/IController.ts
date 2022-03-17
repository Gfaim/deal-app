import { RemoveId } from "../models/DealModel";

interface IController<Type> {
    getById(id: string): Promise<Type | null>;
    getByName(name: string): Promise<Type | null>;
    getList(): Promise<Array<Type>>;
    save(elem: RemoveId<Type>): Promise<Type | null>;
    delete(id: string): Promise<boolean>;
    update(elem: Type): Promise<Type | null>;
}

export type { IController };