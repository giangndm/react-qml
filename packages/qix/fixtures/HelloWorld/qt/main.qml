import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.0

import "macos.bundle.js" as JS;

Item {
  id: root

  Component.onCompleted: {
    JS.Bundle.init(root);
  }
}
