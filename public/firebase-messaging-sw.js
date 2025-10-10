// Importa os scripts necessários do Firebase
// Certifique-se de usar a versão mais recente ou a que você está usando no seu projeto.
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Configurações do Firebase (você só precisa do messagingSenderId aqui)
// Substitua 'YOUR_MESSAGING_SENDER_ID' pelo ID do remetente do seu projeto Firebase.
// Você pode encontrá-lo nas Configurações do Projeto > Cloud Messaging.
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "estoque-tcc.firebaseapp.com",
  projectId: "estoque-tcc",
  storageBucket: "estoque-tcc.firebasestorage.app",
  messagingSenderId: "710664269621",
  appId: "1:710664269621:web:075a7fd3a59223650be67c"
};

// Inicializa o Firebase no Service Worker
firebase.initializeApp(firebaseConfig);

// Recupera uma instância do Firebase Messaging
const messaging = firebase.messaging();

// Configura o manipulador de mensagens de background
// Esta função é chamada quando o app não está em foco (fechado, em outra aba, etc.)
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Mensagem de Background recebida. ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        //icon: '/firebase-logo.png' // Opcional: Caminho para um ícone na pasta public
    };

    // Exibe a notificação
    self.registration.showNotification(notificationTitle, notificationOptions);
});