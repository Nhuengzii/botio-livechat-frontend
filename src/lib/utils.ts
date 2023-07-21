import type { Message } from "@/types/message";

function messageToActivity(message: Message): string {
  let activity = "";
  if (message.attachments.length > 0) {
    let aType = message.attachments[0].attachmentType;
    switch (aType) {
      case "image":
        activity = "ส่งรูปภาพ";
        break
      case "video":
        activity = "ส่งวิดีโอ";
        break
      case "sticker":
        activity = "ส่งสติกเกอร์";
        break
      case "audio":
        activity = "ส่งข้อความเสียง";
        break
      case "file":
        activity = "ส่งไฟล์";
        break
      default:
        activity = "ส่งเทมเพลต";
        break;
    }
  }
  else {
    activity = message.message;
  }
  if (message.isDeleted) {
    activity = "ยกเลิกข้อความ"
  }
  if (message.source.userType == 'user') {
    return activity;
  } else {
    return `คุณ: ${activity}`;
  }
}

export { messageToActivity }
