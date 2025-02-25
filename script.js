document.addEventListener("DOMContentLoaded", function() {
    function say() {
        const link = document.getElementById("say");
        link.onclick = function(event) {
            event.preventDefault(); // Previne o comportamento padrão do link
            alert("função em construção");
        }
    }
    say();
});
