# React Native Performance Benchmarks

This repo aims to provide different scenarios to benchmark performance difference with an easy way to generate release APKs to send over to [Flashlight Cloud](https://docs.flashlight.dev/cloud) 
There are a few scenarios to choose from in the `scenarios` folder

Then you can run 
```bash
./setup-react-native-app.sh <version> <enable new arch or not> <scenario>
```

For instance:
```bash
./setup-react-native-app.sh 0.72.6 false pokedex
```
