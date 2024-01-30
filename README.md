# Bluetooth Remote Control

Repositório da aplicação **Mobile** do projeto **Bluetooth Remote Control**, desenvolvido de nov/2021 a jan/2023, para a criação de um Toyota Trueno (AE86), baseado no anime InitialD, de controle remoto 

<div align="center">
<img src=".github\project-image.png" alt="Bluetooth Remote Control"/><br />
</div>

## Bibliotecas utilizadas

- **[NodeJS](https://nodejs.org/en/)**
- **[ReactJS](https://reactjs.org/)**
- **[React Native](https://reactnative.dev/)**
- **[React Native Sensors](https://react-native-sensors.github.io/)**
- **[React Navigation](https://reactnavigation.org/)**

> Veja o arquivo [package.json](https://github.com/CaduZulian/bluetooth-remote-control/blob/master/package.json)

##  Rodando o projeto

Esse projeto utiliza o React-Native-CLI, então para inicializá-lo será necessário ter as configurações recomendadas. 
Caso não possua, basta clicar [aqui](https://reactnative.dev/docs/environment-setup) e seguir o passo a passo

```bash
# Clone este repositório

$ git clone https://github.com/CaduZulian/bluetooth-remote-control.git

# Acesse a pasta do projeto no terminal/cmd

$ cd bluetooth-remote-control

# Instale as dependências

$ yarn install

# Execute a aplicação

$ yarn android

# O aplicativo inicializará no dispositivo escolhido

```

## Realizando o build [android]
```bash
# Execute o build para release

$ yarn build-android

# Acesse a pasta dentro do projeto onde a release foi criada

$ cd .\android\app\build\outputs\apk\release

# Copie o APK e instale em seus dispositivos desejados

```

## TODO

- Esse projeto foi desenvolvido inteiramente com base no android, então não foram realizados testes nos dispositivos IOS e erros podem ser encontrados. 
Caso encontre erros, basta criar uma PR e ela será avaliada
- No controle remoto, na opção 'Com Botões', os botões não são clicaveis ao mesmo tempo, sendo necessário soltar um botão para poder pressionar o outro. Caso consiga resolver esse problema, basta criar uma PR

## Desenvolvedores

<table align="center">
<tr>
<td> 
<div align="center">
<img style="width: 150px; border-radius: 50%;" src="https://github.com/CaduZulian.png" alt="CaduZulian"/><br />
<a href="https://github.com/CaduZulian">Carlos Eduardo Zulian</a> 
</div>  
</td>
</tr>
</table>