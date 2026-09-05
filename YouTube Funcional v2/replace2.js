const fs=require('fs');
let js = fs.readFileSync('frontend/script.js', 'utf8');

js = js.replace(/<span style=\"font-weight: 500; cursor: pointer; color: #fff; font-size: 13px; margin-left: 12px;\">Responder<\/span>/g, '<span class=\"btn-responder-comentario\" data-comment-id=\"\\" style=\"font-weight: 500; cursor: pointer; color: #fff; font-size: 13px; margin-left: 12px;\">Responder</span>');
js = js.replace(/<span class=\"btn-responder-comentario\" data-comment-id=\"\\\$\\{c.id\\}\" style=\"font-weight: 500; cursor: pointer; color: #fff; font-size: 13px; margin-left: 12px;\">Responder<\/span>/, '<span class=\"btn-responder-comentario\" data-comment-id=\"\\" style=\"font-weight: 500; cursor: pointer; color: #fff; font-size: 13px; margin-left: 12px;\">Responder</span>');

fs.writeFileSync('frontend/script.js', js);
