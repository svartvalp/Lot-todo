let UserService = {
    submitSignUpHandler: async (username, password) => {
        const response = await (fetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }))
        const responseJson = await response.json()
        return responseJson.message
    },

    submitLogInHandler: async (username, password) => {
        if (username.length > 50) {
            return 'Username length can not be more than 50 letters'
        }
        if (password.length > 50) {
            return 'Password length can not be more than 50 letters'
        }
        if (username.length < 6) {
            return 'Username length can not be less than 6 letters'
        }
        if (password.length < 6) {
            return 'Password length can not be less than 6 letters'
        }

        const params = new URLSearchParams({
            username: username,
            password: password
        })

        const url = `/login?${ params.toString() }`

        const response = await fetch(url, {
            method: 'POST',
        })

        if(response.status === 401) {
            return  'Username or password is invalid'
        }

        return response.status
    },

    logOutHandler: () => {
        fetch('/logout')
    },

    getUserId: async () => {
        const response = await fetch('/user/info')
        if (response.status !== 401) {
            const responseJson = await response.json()
            return responseJson
        }
        else {
            return ''
        }
    }
};
export default UserService