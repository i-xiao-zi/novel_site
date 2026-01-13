
export const stringTime = (time: number) => {
    const stamp = Math.round(time / 10000000);
    const min = Math.floor(stamp / 60).toString().padStart(2, '0');
    const sec = (stamp % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}