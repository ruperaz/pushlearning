export default (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
}
