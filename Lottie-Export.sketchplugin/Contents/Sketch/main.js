@import 'sketchLottieExport.js'

// TODO: turn only layers with prefix into images
// TODO: nested artboards (overlapping artboards) – ignore inner ones
// TODO: Add outline option for nested/overlapping artboards

// Global initalised variables from 'context'
var selection, doc, scriptPath, scriptFolder, app
var manifestJSON, iconImage

function onSetUp(context) {
  selection = context.selection
  doc = context.document
  scriptPath = context.scriptPath
  scriptFolder = scriptPath.stringByDeletingLastPathComponent()
  app = NSApplication.sharedApplication()
}


// ****************************
//         Handlers
// ****************************

function exportSelection(context) {
  
    var selection = context.selection;
    var artboards = []
    selection.forEach(function(selectedArtboard) {
        if (selectedArtboard.isMemberOfClass(MSArtboardGroup) || selectedArtboard.isMemberOfClass(MSSymbolMaster)) {
            artboards.push(selectedArtboard)
        }
    })
    if (artboards.length > 0) {
      exportArtboards(artboards)
    } else {
      alertNoArtboards(noArtboardsAlertMessage())
    }
}



// Return the appropriate alert message for when there is no artboards
function noArtboardsAlertMessage() {
  return "Please select artboard(s) or symbol(s) and try again."
}

// ****************************
//     Helper Methods
// ****************************

// Show an alert when there are no Artboards
function alertNoArtboards(message) {
  var alert = NSAlert.alloc().init()
  alert.setIcon(iconImage)
  alert.setMessageText("Lottie Export - No Artboards/Symbols")
  alert.setInformativeText(message)
  alert.addButtonWithTitle("Got it")
  return alert.runModal()
}


// Return the version number for sketch — turned into a single integer
// e.g. '3.8.5' => 385, '40.2' => 402
function sketchVersionNumber() {
  var version = NSBundle.mainBundle().objectForInfoDictionaryKey("CFBundleShortVersionString")
  var versionNumber = version.stringByReplacingOccurrencesOfString_withString(".", "") + ""
  while(versionNumber.length != 3) {
    versionNumber += "0"
  }
  return parseInt(versionNumber)
}

