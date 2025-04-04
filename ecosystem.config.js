module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npm',
      args: 'run dev',
      cwd: './client',
      watch: false,
      env_file: './client/.env',
    },
    {
      name: 'backend',
      script: 'npm',
      args: 'run dev',
      cwd: './server',
      watch: false,
      env_file: './server/.env',
    },
    {
      name: 'ngrok',
      script: 'ngrok',
      args: 'http --url=casual-light-viper.ngrok-free.app 4000',
      watch: false,
    },
  ],
}
