export const isAdmin = (user) => user.role === 'Admin';
export const isInspector = (user) => user.role === 'Inspector';
export const isEngineer = (user) => user.role === 'Engineer';
