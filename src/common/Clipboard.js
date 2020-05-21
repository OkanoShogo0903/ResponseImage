import Vue from 'vue';

export function writeClipboardApi(canvas){
    var err = null
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
