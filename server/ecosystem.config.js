module.exports = {
    apps: [{
        name: 'aphrodite-server',
        script: 'src/app.js',
        node_args: '-r esm',
        instances: 1,
        exec_mode: 'fork',
        wait_ready: false,
        watch: false,
        listen_timeout: 8000,
        kill_timeout: 3000,
        env: {
            NODE_ENV: 'production'
        }
    }]
}