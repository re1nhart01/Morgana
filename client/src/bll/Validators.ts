


export class Validators {
    public get on500Error() {
        return {
            statusCode: 666,
            statusMessage: 'Internal Server Error or problems with connection!'
        }
    }
}