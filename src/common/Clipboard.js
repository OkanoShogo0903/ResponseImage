import Vue from 'vue';

export function writeClipboardApi(el){
    var err = null
    // 空のCanvas作成
    // jsのClipboardApiを使っているため、古いブラウザでは動かない。
    var canvas = document.createElement('canvas');
    canvas.width = el.naturalWidth;
    canvas.height = el.naturalHeight;

    // Canvasにコピーしたい画像を貼り付ける
    canvas.getContext('2d').drawImage(el, 0, 0);

    // CanvasをBlobに変換してクリップボードに貼り付け
    canvas.toBlob(blob => {
        navigator.clipboard.write([
            new ClipboardItem({ [blob.type]: blob })
        ]).then(function () {
            // Success
        }, function (e) {
            // Error
            err=e
        }
        )}
    )
    return err
}
