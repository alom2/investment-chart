# Grafico de investimentos

Um gráfico de investimentos com cores inspiradas em um site de investimentos, possui um controle de períodos no header mas que pode ser controlado pelas setas do teclado.

### Tecnologias

- React
- Redux
- Redux-saga
- EmotionJs
- FontAwesome

## Scripts disponíveis

- npm start
- npm test
- npm run coverage

## Estrutura de pastas

Todos os arquivos relacionados a esse modulo estão dentro da pasta `src` o padrão seguido foi:

#### `redux/`

Na pasta que fica na raiz do `src`, estão todos os combines do redux nescessários. Nos outros casos ele segue o padrão de organização do **reducks**, os testes ficam na pasta `__tests__`.


#### `utils/`

São funções genéricas que ajudam na escrita do código, os testes ficam na pasta `__tests__`.


#### `features/`

Modulos da aplicação por exemplo, o modulo de `Login` teria as telas de `Login`, `ForgotPassword` e outras coisas exclusivas do modulo.


#### `ui/`

Todos os componentes que são somente visuais criados com o emotion, e que não precisam de testes pois são `divs` ou outras tags com estilo e repassando tudo que recebem(comportamento que o emotion se encarrega). Essa pasta possuí um arquivo `index.js` para exporta todos os componentes.


#### `components/`

São componentes com alguma lógica seja de estado ou manipulação da `store`. Componentes são organizados por pastas com seus testes dentro delas e um arquivo `index.js` para exporta somento o componente, podendo ter uma pasta `ui` exclusiva para um componente.


#### `views/`

Todas as paginas do sistema. são organizadas como os `components`.


#### `constants/`

Todas as constantes ficam dentro dessa pasta que pode ser exclusiva de um modulo estando dentro de uma `feature`.

#### `services/`

Pasta onde ficam os serviços que fazem chamadas de api, os testes ficam na pasta `__tests__`.

#### `__tests__/`

Pasta onde ficam alguns testes separados de suas unidades


