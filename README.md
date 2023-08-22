# homepage

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Setup for RSD development
To start development, you will have to ensure that the rsd-shared codebase is also available.
To do this, make sure that rsd-shared is available locally, and make a symlink using:
```
ln -s /location/to/rsd-shared ./src/.shared
```