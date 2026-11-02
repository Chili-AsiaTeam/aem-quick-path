(function () {
  if (document.getElementById('aem-toggle-hook')) return;

  // 1. 创建 UI 面板
  const hook = document.createElement('div');
  hook.id = 'aem-toggle-hook';
  hook.innerHTML = '⚡AEM';
  document.body.appendChild(hook);

  const bar = document.createElement('div');
  bar.id = 'chili-aem-shortcut-bar';
  bar.className = 'collapsed';
  bar.innerHTML = `
    <div class="aem-bar-header">
      <span>AEM 唯一文件夹精准直达</span>
      <span id="aem-close-bar" style="cursor:pointer;">✕</span>
    </div>

    <!-- 专属：展开 Media 列表按钮 -->
    <div style="padding:10px; background:#1e293b; border-bottom:1px solid #334155; text-align:center;">
      <button id="aem-open-media-btn" style="width:100%; background:#22c55e; color:white; border:none; padding:8px; font-size:12px; border-radius:4px; cursor:pointer; font-weight:bold; box-shadow: 0 2px 8px rgba(34,197,94,0.3);">
        🖼️ 1. 打开 MEDIA 选图列表
      </button>
    </div>
    
    <div style="padding:10px; background:#252526; border-bottom:1px solid #3d3d3d;">
      <div style="font-size:11px; color:#aaa; margin-bottom:6px;">2. 保存文件夹精准唯一 ID：</div>
      <input type="text" id="aem-bookmark-name" placeholder="书签别名 (例: Destination 1)" style="width:100%; box-sizing:border-box; padding:5px; background:#1e1e1e; border:1px solid #444; color:#fff; font-size:12px; border-radius:3px; margin-bottom:6px;" />
      <input type="text" id="aem-bookmark-id" placeholder="完整 ID (例: /content/dam/.../destination)" style="width:100%; box-sizing:border-box; padding:5px; background:#1e1e1e; border:1px solid #444; color:#fff; font-size:12px; border-radius:3px; margin-bottom:6px;" />
      
      <button id="aem-save-path-btn" style="width:100%; background:#0e639c; color:white; border:none; padding:6px; font-size:12px; border-radius:3px; cursor:pointer; font-weight:bold;">+ 保存唯一书签</button>
    </div>

    <div style="padding:10px; font-size:11px; color:#aaa;">3. 点击已保存的快捷路径：</div>
    <div id="aem-bookmark-list" style="padding:0 10px; overflow-y:auto; flex:1;"></div>
  `;
  document.body.appendChild(bar);

  // ⚡ 2. 打开左下角 Resources 侧边栏
  function triggerResourcesSidebar() {
    const resourcesBtn = document.getElementById('sw-sidebar-icon-resources-panel') || 
                         document.querySelector('[id*="sw-sidebar-icon-resources-panel"]') ||
                         document.querySelector('[data-testid*="sidebar-icon-resources"]');

    if (resourcesBtn) {
      resourcesBtn.click();
      console.log("⚡ 成功自动激活了左下角 Resources 侧边栏！");
    }
  }

  // ⚡ 3. 只精准点击 Resources 列表里的 "Media" 文本节点
  function clickOnlyMediaItem() {
    triggerResourcesSidebar(); // 确保侧边栏已打开

    setTimeout(() => {
      const allTextNodes = Array.from(document.querySelectorAll('p, span, div, a'));
      const mediaNode = allTextNodes.find(el => {
        const txt = el.textContent.trim().toLowerCase();
        return el.children.length === 0 && txt === 'media';
      });

      if (mediaNode) {
        const clickableRow = mediaNode.closest('div[data-id="gsc-collapse-header"]') || 
                             mediaNode.closest('div[class*="collapse"]') || 
                             mediaNode.parentElement || 
                             mediaNode;

        clickableRow.click();
        console.log("⚡ 成功精准点击了 Media 列表项！", clickableRow);
      }
    }, 150);
  }

  // 绑定绿色按钮事件
  document.getElementById('aem-open-media-btn').addEventListener('click', () => {
    clickOnlyMediaItem();
  });

  // 4. 悬浮球拖拽与纯点击判定
  let isDragging = false;
  let startX = 0, startY = 0;
  let initialLeft = 0, initialTop = 0;

  hook.addEventListener('mousedown', (e) => {
    isDragging = false;
    startX = e.clientX;
    startY = e.clientY;

    const rect = hook.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      isDragging = true;
      hook.style.left = `${initialLeft + dx}px`;
      hook.style.top = `${initialTop + dy}px`;
      hook.style.right = 'auto';
      hook.style.bottom = 'auto';
      
      bar.style.left = `${Math.min(window.innerWidth - 320, Math.max(10, initialLeft + dx - 100))}px`;
      bar.style.top = `${Math.max(10, initialTop + dy - 490)}px`;
    }
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  // ⚡ 点击悬浮球：展开插件面板 + 自动触发左下角 Resources 展开！
  hook.addEventListener('click', () => {
    if (!isDragging) {
      bar.classList.toggle('collapsed');
     
    }
  });

  document.getElementById('aem-close-bar').addEventListener('click', () => bar.classList.add('collapsed'));

  // 5. 渲染书签
  function renderBookmarks() {
    chrome.storage.local.get(['aemFilterBookmarks'], (result) => {
      const list = result.aemFilterBookmarks || [
        { name: 'example', id: '1' }
      ];

      const listEl = document.getElementById('aem-bookmark-list');
      if (!listEl) return;
      listEl.innerHTML = '';

      list.forEach((item, index) => {
        const row = document.createElement('div');
        row.style.cssText = 'background:#2d2d2d; border:1px solid #3d3d3d; border-radius:4px; padding:8px; margin-bottom:8px; cursor:pointer;';
        row.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:12px; font-weight:bold; color:#fff;">📁 ${item.name}</div>
            <span class="del-btn" data-index="${index}" style="color:#ff5252; padding:2px 6px; font-size:12px; cursor:pointer;">✕</span>
          </div>
          <div style="font-size:10px; color:#888; margin-top:3px; word-break:break-all;">ID: ${item.id}</div>
        `;

        row.addEventListener('click', (e) => {
          if (e.target.classList.contains('del-btn')) return;
          executeSmartFilterWithTrafficLight(item.id);
        });

        row.querySelector('.del-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          deleteBookmark(index);
        });

        listEl.appendChild(row);
      });
    });
  }

  let activeObserver = null;
  let lightTimer = null;

  function clearSearchAndRestoreDOM() {
    if (activeObserver) activeObserver.disconnect();
    
    const searchInput = document.querySelector('input[placeholder*="Search"], input[type="search"], input[aria-label*="Search"]');
    if (searchInput) {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      searchInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const allSections = Array.from(document.querySelectorAll('section[id*="/content/dam/"]'));
    allSections.forEach(sec => {
      sec.style.display = '';
      sec.style.border = '';
      sec.style.boxShadow = '';
      sec.style.pointerEvents = '';
      sec.style.cursor = '';
      sec.style.opacity = '';
    });
  }

  // 6. ⚡ 核心指示灯机制与快捷定位
  function executeSmartFilterWithTrafficLight(targetId) {
    clickOnlyMediaItem();

    const folderKeyword = targetId.split('/').pop();

    setTimeout(() => {
      const searchInput = document.querySelector('input[placeholder*="Search"], input[type="search"], input[aria-label*="Search"]');

      if (!searchInput) return;

      if (activeObserver) activeObserver.disconnect();
      if (lightTimer) clearTimeout(lightTimer);

      let isReady = false;

      const filterFunc = () => {
        const allSections = Array.from(document.querySelectorAll('section[id*="/content/dam/"]'));
        
        allSections.forEach(section => {
          const secId = section.getAttribute('id') || '';
          
          if (secId === targetId || secId.endsWith(targetId)) {
            if (!isReady) {
              section.style.cssText = 'display: block !important; border: 3px solid #ff4444 !important; border-radius: 8px !important; box-shadow: 0 0 18px rgba(255, 68, 68, 0.8) !important; pointer-events: none !important; cursor: wait !important; opacity: 0.8;';
            } else {
              section.style.cssText = 'display: block !important; border: 3px solid #007acc !important; border-radius: 8px !important; box-shadow: 0 0 18px rgba(0, 122, 204, 0.8) !important; pointer-events: auto !important; cursor: pointer !important; opacity: 1;';
            }

            if (!section.dataset.boundAutoClear) {
              section.dataset.boundAutoClear = "true";
              const autoClearEvent = () => {
                setTimeout(() => {
                  clearSearchAndRestoreDOM();
                }, 100);
              };
              section.addEventListener('click', autoClearEvent);
              section.addEventListener('dblclick', autoClearEvent);
            }

          } else {
            section.style.cssText = 'display: none !important;';
          }
        });
      };

      const targetContainer = document.querySelector('div[id*="sw-resources-container"], div[id*="panel-item-browser"]') || document.body;
      activeObserver = new MutationObserver(() => filterFunc());
      activeObserver.observe(targetContainer, { childList: true, subtree: true });

      searchInput.focus();
      searchInput.value = folderKeyword;
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      searchInput.dispatchEvent(new Event('change', { bubbles: true }));

      const enterInit = { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true };
      searchInput.dispatchEvent(new KeyboardEvent('keydown', enterInit));
      searchInput.dispatchEvent(new KeyboardEvent('keyup', enterInit));

      setTimeout(() => {
        searchInput.blur();
        filterFunc();
      }, 100);

      bar.classList.add('collapsed');

      lightTimer = setTimeout(() => {
        isReady = true;
        filterFunc();
      }, 3500);

    }, 200);
  }

  // 保存与删除
  document.getElementById('aem-save-path-btn').addEventListener('click', () => {
    const name = document.getElementById('aem-bookmark-name').value.trim();
    const id = document.getElementById('aem-bookmark-id').value.trim();

    if (!name || !id) {
      alert('请填写名称和完整 ID！');
      return;
    }

    chrome.storage.local.get(['aemFilterBookmarks'], (result) => {
      const list = result.aemFilterBookmarks || [];
      list.push({ name, id });
      chrome.storage.local.set({ aemFilterBookmarks: list }, () => {
        document.getElementById('aem-bookmark-name').value = '';
        document.getElementById('aem-bookmark-id').value = '';
        renderBookmarks();
      });
    });
  });

  function deleteBookmark(index) {
    chrome.storage.local.get(['aemFilterBookmarks'], (result) => {
      let list = result.aemFilterBookmarks || [];
      list.splice(index, 1);
      chrome.storage.local.set({ aemFilterBookmarks: list }, () => renderBookmarks());
    });
  }

  renderBookmarks();
})();