const initialState = [
    {
        id: 1,
        name: 'Title',
        description: 'Description',
        address: 'address',
        phone: 'phone',
        comment: 'comment',
        updated_at: new Date()
    },
    {
        id: 2,
        name: 'Title',
        description: 'Description',
        address: 'address',
        phone: 'phone',
        comment: 'comment',
        updated_at: new Date()
    },
    {
        id: 3,
        name: 'Title',
        description: 'Description',
        address: 'address',
        phone: 'phone',
        comment: 'comment',
        updated_at: new Date()
    },
];

export function stoReducer(state = initialState, action) {
    switch (action.type) {

        default:
            return state
    }
}