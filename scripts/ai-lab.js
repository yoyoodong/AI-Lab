/**
 * AI实验室页面交互功能
 * @author YoyooAI
 * @description 实现AI实验室页面的工具演示、项目展示和交互功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 工具卡片交互效果
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const toolButton = card.querySelector('.tool-button');
        
        toolButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取工具名称
            const toolName = card.querySelector('h3').textContent;
            
            // 显示演示对话框
            showToolDemo(toolName);
        });
    });
    
    // 项目卡片交互效果
    const projectCards = document.querySelectorAll('.lab-project-card');
    
    projectCards.forEach(card => {
        const projectLink = card.querySelector('.project-link');
        
        projectLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取项目名称
            const projectName = card.querySelector('h3').textContent;
            
            // 显示项目详情对话框
            showProjectDetails(projectName);
        });
        
        // 添加卡片悬停动画效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // 工具演示对话框
    function showToolDemo(toolName) {
        // 创建对话框容器
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        // 根据工具名称构建不同内容
        let demoContent = '';
        
        if (toolName === '文本转图像生成器') {
            demoContent = `
                <div class="tool-demo-content">
                    <div class="tool-form">
                        <div class="form-group">
                            <label>描述你想要的图像</label>
                            <textarea placeholder="例如：一只玩耍的小猫，水彩风格"></textarea>
                        </div>
                        <div class="form-group">
                            <label>选择图像风格</label>
                            <select>
                                <option>写实风格</option>
                                <option>水彩画</option>
                                <option>像素艺术</option>
                                <option>3D渲染</option>
                            </select>
                        </div>
                        <button class="generate-btn">生成图像</button>
                    </div>
                    <div class="demo-result">
                        <p class="demo-message">点击"生成图像"按钮开始演示</p>
                    </div>
                </div>
            `;
        } else if (toolName === '布局智能助手') {
            demoContent = `
                <div class="tool-demo-content">
                    <div class="tool-form">
                        <div class="form-group">
                            <label>描述你的设计需求</label>
                            <textarea placeholder="例如：一个电商产品页面，需要展示产品图、描述和购买按钮"></textarea>
                        </div>
                        <div class="form-group">
                            <label>选择设备类型</label>
                            <select>
                                <option>桌面端</option>
                                <option>移动端</option>
                                <option>平板端</option>
                            </select>
                        </div>
                        <button class="generate-btn">生成布局</button>
                    </div>
                    <div class="demo-result">
                        <p class="demo-message">点击"生成布局"按钮开始演示</p>
                    </div>
                </div>
            `;
        } else {
            demoContent = `
                <div class="tool-demo-content">
                    <p>该工具演示正在开发中，敬请期待！</p>
                </div>
            `;
        }
        
        // 构建完整对话框内容
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${toolName}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    ${demoContent}
                </div>
            </div>
        `;
        
        // 添加到页面
        document.body.appendChild(modal);
        
        // 添加关闭功能
        modal.querySelector('.close-btn').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // 阻止点击内容区域关闭对话框
        modal.querySelector('.modal-content').addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // 点击背景关闭对话框
        modal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // 添加生成按钮功能（模拟）
        const generateBtn = modal.querySelector('.generate-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', function() {
                const resultDiv = modal.querySelector('.demo-result');
                resultDiv.innerHTML = '<p class="loading-message">AI正在处理中...</p>';
                
                // 模拟加载
                setTimeout(function() {
                    if (toolName === '文本转图像生成器') {
                        resultDiv.innerHTML = `
                            <div class="result-image">
                                <svg width="100%" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="300" height="200" rx="8" fill="#f0f0f0" />
                                    <ellipse cx="150" cy="120" rx="70" ry="50" fill="#FAFAFA" stroke="#ccc" />
                                    <circle cx="130" cy="100" r="10" fill="#000" />
                                    <circle cx="170" cy="100" r="10" fill="#000" />
                                    <path d="M120 130C120 130 135 145 150 145C165 145 180 130 180 130" stroke="#000" stroke-width="2" stroke-linecap="round" />
                                    <path d="M110 80L130 90" stroke="#000" stroke-width="2" />
                                    <path d="M190 80L170 90" stroke="#000" stroke-width="2" />
                                </svg>
                            </div>
                            <p class="result-caption">生成结果（示例）</p>
                            <button class="download-btn">下载图像</button>
                        `;
                    } else if (toolName === '布局智能助手') {
                        resultDiv.innerHTML = `
                            <div class="result-layout">
                                <svg width="100%" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="300" height="200" rx="8" fill="#f0f0f0" />
                                    <rect x="20" y="20" width="150" height="120" rx="4" stroke="#000" fill="#FAFAFA" />
                                    <rect x="190" y="20" width="90" height="60" rx="4" stroke="#000" fill="#FAFAFA" />
                                    <rect x="190" y="90" width="90" height="50" rx="4" stroke="#000" fill="#FAFAFA" />
                                    <rect x="190" y="150" width="90" height="30" rx="15" fill="#0066FF" />
                                    <text x="235" y="170" font-family="'Noto Sans SC'" font-size="12" fill="white" text-anchor="middle">购买</text>
                                </svg>
                            </div>
                            <p class="result-caption">推荐布局（示例）</p>
                            <button class="download-btn">导出布局</button>
                        `;
                    }
                    
                    // 添加下载按钮功能（模拟）
                    const downloadBtn = resultDiv.querySelector('.download-btn');
                    if (downloadBtn) {
                        downloadBtn.addEventListener('click', function() {
                            alert('下载功能模拟：文件已准备好下载');
                        });
                    }
                }, 1500);
            });
        }
    }
    
    // 项目详情对话框
    function showProjectDetails(projectName) {
        alert(`项目详情页面 "${projectName}" 正在开发中，敬请期待！`);
    }
}); 