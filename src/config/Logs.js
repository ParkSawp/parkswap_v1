
export const Logs = {
    /**
     * @param {...*} args
     */
    log: function(...args) {
        // console.log('LOGS: ', ...Array.from(args));
    },
    /**
     * @param {...*} args
     */
    error: function(...args) {
        // console.log('ERROR: ', ...args);
    },
    /**
     * @param {...*} args
     */
    watch: function(...args) {
        console.log('WATCH: ')
        console.table(...args);
    }
}