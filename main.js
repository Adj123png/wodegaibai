/**
 * 表白网页主要JavaScript文件
 * 实现各种动画和交互效果
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化变量
    const loadingScreen = document.getElementById('loading');
    const mainContent = document.getElementById('main-content');
    const musicBtn = document.getElementById('music-btn');
    const bgm = document.getElementById('bgm');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const saveSettingsBtn = document.getElementById('save-settings');
    const nameInput = document.getElementById('name-input');
    const myNameInput = document.getElementById('my-name-input');
    const themeSelect = document.getElementById('theme-select');
    const loverNameSpan = document.getElementById('lover-name');
    const myNameSpan = document.getElementById('my-name');
    const acceptBtn = document.getElementById('accept-btn');
    const thinkBtn = document.getElementById('think-btn');
    const celebration = document.getElementById('celebration');
    const todayDate = document.getElementById('today-date');
    const beatingHeart = document.getElementById('beating-heart');
    
    // 照片轮播相关元素
    const photoItems = document.querySelectorAll('.photo-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentPhotoIndex = 0;
    
    // 初始化函数
    function init() {
        // 模拟加载过程
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            mainContent.style.opacity = '1';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                
                // 初始化打字效果
                initTypewriter();
                
                // 初始化粒子效果
                initParticles();
                
                // 初始化漂浮爱心
                initFloatingHearts();
                
                // 设置当前日期
                setTodayDate();
            }, 500);
        }, 2000);
        
        // 初始化事件监听
        initEventListeners();
        
        // 从本地存储加载设置
        loadSettings();
    }
    
    // 初始化事件监听
    function initEventListeners() {
        // 音乐控制
        musicBtn.addEventListener('click', toggleMusic);
        
        // 设置面板控制
        settingsBtn.addEventListener('click', toggleSettings);
        saveSettingsBtn.addEventListener('click', saveSettings);
        
        // 照片轮播控制
        prevBtn.addEventListener('click', prevPhoto);
        nextBtn.addEventListener('click', nextPhoto);
        
        // 接受按钮
        acceptBtn.addEventListener('click', showCelebration);
        
        // 思考按钮（逃跑按钮）
        thinkBtn.addEventListener('click', runAwayButton);
        
        // 心跳点击
        beatingHeart.addEventListener('click', showCelebration);
    }
    
    // 初始化打字效果
    function initTypewriter() {
        const letterContent = document.getElementById('typewriter-text');
        const paragraphs = letterContent.querySelectorAll('p');
        
        // 隐藏所有段落
        paragraphs.forEach(p => {
            if (!p.classList.contains('signature')) {
                p.style.opacity = '0';
            }
        });
        
        // 逐段显示文字
        let delay = 0;
        paragraphs.forEach((p, index) => {
            if (index === 0 || p.classList.contains('signature')) {
                p.style.opacity = '1';
                return;
            }
            
            setTimeout(() => {
                p.style.opacity = '1';
                
                // 使用Typed.js创建打字效果
                if (typeof Typed !== 'undefined') {
                    const text = p.textContent;
                    p.textContent = '';
                    
                    new Typed(p, {
                        strings: [text],
                        typeSpeed: 30,
                        startDelay: 300,
                        showCursor: false
                    });
                }
            }, delay);
            
            delay += 2000; // 每段之间的延迟
        });
    }
    
    // 初始化粒子效果
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 50,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#ff4b6e"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ff85a1",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    // 初始化漂浮爱心
    function initFloatingHearts() {
        const floatingHeartsContainer = document.querySelector('.floating-hearts');
        
        // 创建30个漂浮爱心
        for (let i = 0; i < 30; i++) {
            createFloatingHeart(floatingHeartsContainer);
        }
    }
    
    // 创建单个漂浮爱心
    function createFloatingHeart(container) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart');
        heart.style.position = 'absolute';
        heart.style.color = getRandomColor();
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 15 + 5}px`;
        heart.style.opacity = `${Math.random() * 0.5 + 0.3}`;
        heart.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(heart);
        
        // 添加浮动动画样式
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes float {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
                }
                100% {
                    transform: translate(0, 0) rotate(0deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 获取随机颜色
    function getRandomColor() {
        const colors = ['#ff4b6e', '#ff85a1', '#ffd0d0', '#ff9eb5', '#ff6384'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // 切换音乐播放状态
    function toggleMusic() {
        if (bgm.paused) {
            bgm.play();
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            bgm.pause();
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    }
    
    // 切换设置面板显示状态
    function toggleSettings() {
        if (settingsPanel.style.display === 'block') {
            settingsPanel.style.display = 'none';
        } else {
            settingsPanel.style.display = 'block';
        }
    }
    
    // 保存设置
    function saveSettings() {
        // 更新名字
        if (nameInput.value.trim() !== '') {
            loverNameSpan.textContent = nameInput.value.trim();
        }
        
        if (myNameInput.value.trim() !== '') {
            myNameSpan.textContent = myNameInput.value.trim();
        }
        
        // 更新主题
        const theme = themeSelect.value;
        document.body.className = '';
        document.body.classList.add(`theme-${theme}`);
        
        // 保存到本地存储
        const settings = {
            loverName: nameInput.value.trim() || '__NAME__',
            myName: myNameInput.value.trim() || '__MY_NAME__',
            theme: theme
        };
        
        localStorage.setItem('loveConfessionSettings', JSON.stringify(settings));
        
        // 关闭设置面板
        settingsPanel.style.display = 'none';
        
        // 显示保存成功提示
        Swal.fire({
            title: '设置已保存',
            text: '您的个性化设置已成功应用',
            icon: 'success',
            confirmButtonColor: getComputedStyle(document.body).getPropertyValue('--primary-color')
        });
    }
    
    // 从本地存储加载设置
    function loadSettings() {
        const savedSettings = localStorage.getItem('loveConfessionSettings');
        
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            
            // 设置名字
            if (settings.loverName && settings.loverName !== '__NAME__') {
                loverNameSpan.textContent = settings.loverName;
                nameInput.value = settings.loverName;
            }
            
            if (settings.myName && settings.myName !== '__MY_NAME__') {
                myNameSpan.textContent = settings.myName;
                myNameInput.value = settings.myName;
            }
            
            // 设置主题
            if (settings.theme) {
                themeSelect.value = settings.theme;
                document.body.className = '';
                document.body.classList.add(`theme-${settings.theme}`);
            }
        }
    }
    
    // 照片轮播 - 下一张
    function nextPhoto() {
        photoItems[currentPhotoIndex].style.transform = 'translateX(-100%)';
        currentPhotoIndex = (currentPhotoIndex + 1) % photoItems.length;
        photoItems[currentPhotoIndex].style.transform = 'translateX(0)';
        
        // 重置其他照片位置
        for (let i = 0; i < photoItems.length; i++) {
            if (i !== currentPhotoIndex) {
                photoItems[i].style.transform = i < currentPhotoIndex ? 'translateX(-100%)' : 'translateX(100%)';
            }
        }
    }
    
    // 照片轮播 - 上一张
    function prevPhoto() {
        photoItems[currentPhotoIndex].style.transform = 'translateX(100%)';
        currentPhotoIndex = (currentPhotoIndex - 1 + photoItems.length) % photoItems.length;
        photoItems[currentPhotoIndex].style.transform = 'translateX(0)';
        
        // 重置其他照片位置
        for (let i = 0; i < photoItems.length; i++) {
            if (i !== currentPhotoIndex) {
                photoItems[i].style.transform = i < currentPhotoIndex ? 'translateX(-100%)' : 'translateX(100%)';
            }
        }
    }
    
    // 显示庆祝动画
    function showCelebration() {
        celebration.style.display = 'flex';
        
        // 播放音乐
        if (bgm.paused) {
            bgm.play();
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        
        // 启动烟花效果
        initFireworks();
        
        // 启动彩带效果
        if (typeof confetti !== 'undefined') {
            const duration = 8 * 1000;
            const animationEnd = Date.now() + duration;
            
            const randomInRange = (min, max) => Math.random() * (max - min) + min;
            
            (function frame() {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff4b6e', '#ff85a1', '#ffd0d0']
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff4b6e', '#ff85a1', '#ffd0d0']
                });
                
                if (Date.now() < animationEnd) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }
    
    // 初始化烟花效果
    function initFireworks() {
        const fireworksContainer = document.querySelector('.fireworks');
        
        // 创建10个烟花
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFirework(fireworksContainer);
            }, i * 800);
        }
    }
    
    // 创建单个烟花
    function createFirework(container) {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        
        // 随机位置
        const left = Math.random() * 100;
        const top = 50 + Math.random() * 40;
        
        firework.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: ${top}%;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: ${getRandomColor()};
            box-shadow: 0 0 10px 2px ${getRandomColor()};
            animation: explode 1s forwards;
            opacity: 0;
        `;
        
        container.appendChild(firework);
        
        // 添加爆炸动画
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes explode {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                50% {
                    transform: scale(20);
                    opacity: 1;
                }
                100% {
                    transform: scale(40);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // 移除烟花元素
        setTimeout(() => {
            firework.remove();
            style.remove();
        }, 1000);
    }
    
    // 设置当前日期
    function setTodayDate() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        todayDate.textContent = now.toLocaleDateString('zh-CN', options);
    }
    
    // 逃跑按钮效果
    function runAwayButton() {
        const btn = document.getElementById('think-btn');
        
        // 随机移动按钮位置
        const moveButton = () => {
            const maxX = window.innerWidth - btn.offsetWidth;
            const maxY = window.innerHeight - btn.offsetHeight;
            
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            
            btn.style.position = 'fixed';
            btn.style.left = `${randomX}px`;
            btn.style.top = `${randomY}px`;
        };
        
        // 第一次点击时显示提示
        if (!btn.dataset.clicked) {
            btn.dataset.clicked = 'true';
            
            Swal.fire({
                title: '真的要考虑吗？',
                text: '再仔细想想吧~',
                icon: 'question',
                confirmButtonColor: getComputedStyle(document.body).getPropertyValue('--primary-color')
            });
            
            // 添加鼠标悬停事件
            btn.addEventListener('mouseover', moveButton);
        } else {
            moveButton();
        }
    }
    
    // 初始化照片位置
    function initPhotoPositions() {
        photoItems[0].style.transform = 'translateX(0)';
        
        for (let i = 1; i < photoItems.length; i++) {
            photoItems[i].style.transform = 'translateX(100%)';
        }
    }
    
    // 初始化
    init();
    initPhotoPositions();
});
