export const formatData = (data) => {
    const formattedData = [];
    if (data) {
        Object.entries(data).forEach(([key, value]) => {
            formattedData.push({
                x: key,  // Ensure the key is converted to a Date object
                y: [
                    (value['0']),
                    (value['1']),
                    (value['2']),
                    (value['3'])
                ]
            });
        });
    }
    return formattedData;
}
