// Importa tudo que está disponível na biblioteca Three.js.
// O "THREE" será o objeto que vamos usar para acessar classes e funcionalidades
// como Scene, Camera, Mesh, Light, Renderer, Geometry, Material etc.
import * as THREE from 'three';


// ============================================================
// 1. CRIAÇÃO DA CENA
// ============================================================

// Cria uma nova cena 3D.
// A Scene funciona como um "container" onde colocaremos todos os objetos
// que queremos visualizar: cubo, luzes, modelos 3D, câmera etc.
const scene = new THREE.Scene();

// Define a cor de fundo da cena.
// Aqui estamos usando a cor #F0F0F0, que é um cinza bem claro.
scene.background = new THREE.Color('#F0F0F0');


// ============================================================
// 2. CRIAÇÃO E CONFIGURAÇÃO DA CÂMERA
// ============================================================

// Cria uma câmera do tipo PerspectiveCamera.
//
// Os parâmetros são:
//
// 1º parâmetro: 75
//    É o campo de visão (FOV - Field of View).
//    Quanto maior o valor, maior será a área da cena que a câmera consegue
//    enxergar. 75 graus é um valor comum para uma câmera 3D.
//
// 2º parâmetro: window.innerWidth / window.innerHeight
//    Representa a proporção (aspect ratio) da tela.
//    Estamos dividindo a largura pela altura da janela para evitar que
//    os objetos apareçam deformados.
//
// 3º parâmetro: 0.1
//    É a distância mínima que a câmera consegue enxergar.
//    Objetos mais próximos que 0.1 unidades não serão renderizados.
//
// 4º parâmetro: 1000
//    É a distância máxima que a câmera consegue enxergar.
//    Objetos que estiverem além de 1000 unidades não serão renderizados.
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Posiciona a câmera no eixo Z.
//
// Em Three.js, os eixos funcionam assim:
// X → esquerda / direita
// Y → baixo / cima
// Z → frente / trás
//
// O cubo será criado inicialmente próximo ao centro da cena,
// então colocamos a câmera 5 unidades para trás no eixo Z
// para conseguir enxergá-lo.
camera.position.z = 5;


// ============================================================
// 3. CRIAÇÃO E ADIÇÃO DO CUBO
// ============================================================

// Cria a geometria do cubo.
//
// BoxGeometry é responsável pela FORMA/ESTRUTURA do objeto.
// Neste caso, é um cubo.
//
// Como nenhum tamanho foi informado, o Three.js utiliza os valores
// padrão para largura, altura e profundidade.
const geometry = new THREE.BoxGeometry();


// Cria o material que será aplicado à geometria.
//
// MeshLambertMaterial é um material que reage à iluminação da cena.
// Isso significa que a aparência do cubo será influenciada pelas luzes
// que adicionarmos posteriormente.
const material = new THREE.MeshLambertMaterial({

  // Define a cor principal do cubo.
  // Aqui usamos um tom de amarelo.
  color: '#f8e911',

  // Define uma cor emissiva.
  //
  // A propriedade emissive simula uma espécie de "brilho próprio"
// do material. Ela não substitui a iluminação da cena, mas adiciona
  // uma contribuição de cor ao objeto.
  emissive: '#d37adf'
});


// Cria o objeto 3D (Mesh).
//
// Um Mesh é formado basicamente pela combinação de:
//
// GEOMETRY + MATERIAL = MESH
//
// geometry → define o formato do objeto
// material → define sua aparência
//
// Então aqui estamos juntando o cubo que criamos com o material.
const cube = new THREE.Mesh(geometry, material);


// Adiciona o cubo dentro da cena.
//
// Sem essa linha, o cubo existiria na memória, mas não faria parte
// da cena que será renderizada.
scene.add(cube);


// ============================================================
// 4. ADIÇÃO DA ILUMINAÇÃO
// ============================================================

// Cria uma luz direcional.
//
// DirectionalLight simula uma luz que vem de uma determinada direção,
// como a luz do Sol.
//
// O primeiro parâmetro é a cor da luz:
// 0x9CDBA6 → um tom esverdeado.
//
// O segundo parâmetro é a intensidade:
// 10 → intensidade relativamente forte.
const light = new THREE.DirectionalLight(0x9CDBA6, 10);


// Define a posição da luz.
//
// X = 1
// Y = 1
// Z = 1
//
// Isso coloca a luz em uma posição diagonal em relação ao cubo.
//
// É importante lembrar que, no caso da DirectionalLight,
// a posição indica a direção de onde a luz está vindo.
light.position.set(1, 1, 1);


// Adiciona a luz à cena.
//
// Assim como aconteceu com o cubo, a luz precisa fazer parte da cena
// para participar do processo de renderização.
scene.add(light);


// ============================================================
// 5. CONFIGURAÇÃO DO RENDERIZADOR
// ============================================================

// Cria o Renderer.
//
// O WebGLRenderer é responsável por transformar tudo que configuramos
// na cena 3D em uma imagem que o navegador consegue mostrar na tela.
//
// Em outras palavras:
//
// Scene + Camera + Lights + Objects
//                ↓
//            Renderer
//                ↓
//           Imagem na tela
const renderer = new THREE.WebGLRenderer();


// Define o tamanho da área de renderização.
//
// window.innerWidth  → largura atual da janela do navegador
// window.innerHeight → altura atual da janela do navegador
//
// Dessa forma, o canvas ocupará toda a área disponível da janela.
renderer.setSize(window.innerWidth, window.innerHeight);


// Adiciona o canvas criado pelo Three.js dentro do HTML.
//
// renderer.domElement é o elemento <canvas> que o Three.js criou.
//
// O document.body representa o <body> da página.
//
// Portanto, esta linha basicamente coloca o canvas 3D dentro do body.
document.body.appendChild(renderer.domElement);


// ============================================================
// 6. ANIMAÇÃO DA CENA
// ============================================================

// Cria uma função responsável por controlar a animação.
//
// Essa função será executada repetidamente para criar a sensação
// de movimento contínuo.
function animate(){

    // Solicita ao navegador que execute a função novamente
    // no próximo quadro da animação.
    //
    // requestAnimationFrame é preferível a simplesmente utilizar
    // setInterval/setTimeout para animações, porque o navegador
    // consegue sincronizar melhor a renderização com a taxa de
    // atualização da tela.
    //
    // Aqui acontece uma espécie de loop:
    //
    // animate()
    //    ↓
    // requestAnimationFrame(animate)
    //    ↓
    // animate()
    //    ↓
    // requestAnimationFrame(animate)
    //    ↓
    // ... e assim por diante.
    requestAnimationFrame(animate);


    // Aumenta a rotação do cubo no eixo X.
    //
    // rotation.x representa a rotação do objeto em torno do eixo X.
    //
    // 0.01 é uma pequena quantidade adicionada a cada quadro.
    // Como isso acontece muitas vezes por segundo, o cubo parece
    // girar continuamente.
    cube.rotation.x += 0.01;


    // Aumenta a rotação do cubo no eixo Y.
    //
    // Assim como no eixo X, adicionamos 0.01 a cada quadro.
    //
    // Como estamos alterando X e Y ao mesmo tempo, o cubo fará
    // uma rotação combinada, dando uma aparência mais tridimensional.
    cube.rotation.y += 0.01;


    // Renderiza a cena.
    //
    // O primeiro argumento é a cena que queremos desenhar.
    // O segundo argumento é a câmera que será usada para enxergar
    // essa cena.
    //
    // Basicamente:
    //
    // "Three.js, desenhe a scene usando a visão da camera."
    renderer.render(scene, camera);
}


// Inicia o loop de animação.
//
// Sem essa chamada, a função animate() teria sido apenas criada,
// mas nunca seria executada.
//
// A partir daqui, o requestAnimationFrame começa a chamar
// animate() continuamente e o cubo começa a girar.
animate();