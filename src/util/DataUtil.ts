
export const getFullDateNow = () => {
    // how to access date today
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    // console.log(today.toISOString())

    return today.toISOString();
}