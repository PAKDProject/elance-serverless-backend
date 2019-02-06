import { TableModel } from '../models/tableModel';

export const ValidateUser = (user: TableModel) => {
    if (user.tagline.length > 50) return false;
    if (user.description.length > 300) return false;
    return true;
}