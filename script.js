const robot = document.querySelector('#robot');
const robotModel = document.querySelector('#robot-model');
const chat = document.querySelector('#chatbot');
const transform = document.querySelector('#transform');
const bubble = document.querySelector('#bubble');
let tapCount = 0, tapTimer, state = 'idle';
function playRobotMotion(name, repetitions = Infinity) {
  if (!robotModel) return;
  robotModel.animationName = name;
  robotModel.currentTime = 0;
  robotModel.play({ repetitions });
}
const answers = {
  about: "Arvinth is a Software Engineer focused on AI, data, backend systems, and meaningful product experiences.",
  skills: "His toolkit includes Python, Java, React, FastAPI, Spring Boot, PostgreSQL, Docker, RAG, and LLM-powered systems.",
  projects: "SYNOVA is an AI insurance system that brings together React, FastAPI, retrieval augmented generation, pgvector, and live provider data.",
  experience: "His path combines a strong engineering foundation with hands-on data and AI projects, now evolving into product-minded software engineering."
};
function setChat(open = true) { state = open ? 'chatbot' : 'idle'; chat.classList.toggle('open', open); chat.setAttribute('aria-hidden', !open); bubble.innerHTML = open ? '<strong>Chat mode active</strong><br /><small>Ask me anything about Arvinth.</small>' : '<strong>Hi! <span>👋</span></strong><br />I\'m Arvinth\'s AI assistant.<br /><small>Double click to talk, triple click to drive.</small>'; }
function drive() { if(state === 'transforming') return; state='transforming'; setChat(false); transform.classList.add('show'); setTimeout(()=>{ transform.classList.remove('show'); state='car'; window.location.hash='projects'; setTimeout(()=>state='driving',450); },1900); }
function interpret(text) { const q = text.toLowerCase(); if(q.includes('skill')||q.includes('tech'))return answers.skills;if(q.includes('project')||q.includes('synova'))return answers.projects;if(q.includes('experience')||q.includes('work'))return answers.experience;return answers.about; }
function reply(text){ const body=document.querySelector('#chat-body'); const you=document.createElement('div');you.className='user-message';you.textContent=text;body.appendChild(you); setTimeout(()=>{const bot=document.createElement('div');bot.className='bot-message';bot.textContent=interpret(text);body.appendChild(bot);body.scrollTop=body.scrollHeight},420); }
robot.addEventListener('click', () => { tapCount++; clearTimeout(tapTimer); tapTimer=setTimeout(()=>{ if(tapCount===1)setChat(false); else if(tapCount===2)setChat(true); else drive(); tapCount=0; },280); });
robot.addEventListener('keydown', e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setChat(true)}});
document.querySelectorAll('[data-chat]').forEach(b=>b.addEventListener('click',()=>setChat(true)));
document.querySelector('#close-chat').addEventListener('click',()=>setChat(false));
document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>reply(b.textContent)));
document.querySelector('#chat-form').addEventListener('submit',e=>{e.preventDefault();const input=document.querySelector('#chat-input');if(input.value.trim()){reply(input.value);input.value=''}});
const cursor=document.querySelector('.cursor'); window.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'}); document.querySelectorAll('a,button,#robot').forEach(el=>{el.addEventListener('pointerenter',()=>cursor.classList.add('grow'));el.addEventListener('pointerleave',()=>cursor.classList.remove('grow'))});
window.addEventListener('scroll',()=>{document.querySelector('.nav').classList.toggle('scrolled',scrollY>20); if(scrollY>280&&state==='idle') bubble.style.opacity='.55'; else bubble.style.opacity='1';},{passive:true});
robotModel?.addEventListener('load', () => {
  robotModel.classList.add('model-ready');
  playRobotMotion('Idle');
});
// Capture the model click before the legacy stage handler so every gesture maps to a GLB motion.
robot.addEventListener('click', event => {
  event.stopImmediatePropagation();
  tapCount++;
  clearTimeout(tapTimer);
  tapTimer = setTimeout(() => {
    if (tapCount === 1) {
      setChat(false);
      playRobotMotion('Wave', 1);
    } else if (tapCount === 2) {
      setChat(true);
      playRobotMotion('ThumbsUp', 1);
    } else {
      playRobotMotion('Running', 1);
      drive();
    }
    tapCount = 0;
  }, 280);
}, true);
