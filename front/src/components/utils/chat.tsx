export const getMessageDateString = (date: string): string => {
    const currentDate = new Date();
    const dateMessage = new Date(date);

    if (currentDate.getFullYear() === dateMessage.getFullYear()
        && currentDate.getMonth() === dateMessage.getMonth()
        && currentDate.getDate() === dateMessage.getDate())
        return (`Aujourd'hui à ${dateMessage.getHours()}:${dateMessage.getMinutes() >= 0 && dateMessage.getMinutes() <= 9 ? '0' : ''}${dateMessage.getMinutes()}`);
    else if (currentDate.getFullYear() === dateMessage.getFullYear()
        && currentDate.getMonth() === dateMessage.getMonth()
        && (currentDate.getDate() - 1) === dateMessage.getDate())
        return (`Hier à ${dateMessage.getHours()}:${dateMessage.getMinutes() >= 0 && dateMessage.getMinutes() <= 9 ? '0' : ''}${dateMessage.getMinutes()}`);
    else
        return (`${dateMessage.getDate()}/${dateMessage.getMonth() + 1}/${dateMessage.getFullYear()}`);
}