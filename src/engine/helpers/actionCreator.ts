const actionTypeCreator = (name: string) => ({
    REQUEST: `REQUEST/${name}`,
    SUCCESS: `SUCCESS/${name}`,
    ERROR: `ERROR/${name}`
})

export default actionTypeCreator