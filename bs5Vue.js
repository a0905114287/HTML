
const part = Vue.createApp({
    data() {
        return {
            parts: [], // 初始化 parts 為空陣列
        };
    },
    mounted() {
        // 使用 jQuery 的 $.ajax 發送請求
        $.ajax({
            url: "/profolio", // API 路徑
            method: "GET",    // HTTP 方法
            dataType: "json", // 資料格式
            success: (results) => {
                this.parts = results; // 將回傳的資料綁定到 Vue 的 parts
            },
            error: (xhr, status, error) => {
                console.error("Error fetching data:", status, error);
            },
        });
    },
});

// 掛載 Vue 應用程式到指定的 DOM 元素
part.mount("#part");
