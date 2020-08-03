import auth from "../services/api";


async function checkUserTo(createdAt, refresh_to) {
    const dateNow = new Date();
    console.log('date now    ', dateNow)
    const dateBefore = new Date(parseInt(createdAt))
    console.log(createdAt, "\nantes  " + dateBefore)
    const resultInMinutes = Math.round((dateNow.getTime() - dateBefore.getTime()) / 60000);
    console.log('resultado ', resultInMinutes)
    if (resultInMinutes >= 60) {
        console.log('RESULTADO AQUI DENTRO ', resultInMinutes)
        return await auth.get('auth', {
            headers: {
                refresh: refresh_to
            }
        });
    }
    return false;
}

export async function retrieveTokenAsync(code) {

    const retrived = await auth.get('auth', {
        params: {
            code: code
        }
    })
        .then(res => {
            console.log(res.data, "res.data retrieve")
            return res.data;
        })
        .catch(error => {
            // dispatch(onError(error));
            alert("Ops, aconteceu algum problema por favor verifique sua conexão de internet :(")
            return undefined
        });
        console.log(retrived, "retrived")
    return retrived;

}

export default checkUserTo;