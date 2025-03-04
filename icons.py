from os import walk

def file_listing( dir, sort = True ):
  files = []
  for( _, _, filenames ) in walk( dir ):
    files.extend( filenames )
    break

  filtered = filter( hidden_file, files )
  files = list( filtered )

  if sort:
    files = sorted( files )

  return files

def hidden_file( name ):
  return not name.startswith( "." )

# Load component template
template = ""
with open( "./icons.txt", "r" ) as file:
  template = file.read()

# List of icon files
files = file_listing( "./icons" )

markup = "\n"
registry = ""

# Iterate icons files
for file in files:
  # Tag and class name variations
  tag_name = file[:-4]
  class_name = file[:-4].title().replace( "-", "" )

  # Import statement
  registry = registry + "import RFIcon" + class_name + " from \"./components/icons/" + file[:-3] + "js\";\n"

  # Markup version
  markup = markup + "<rf-icon-" + tag_name + "></rf-icon-" + tag_name + ">\n"

  svg = ""

  # Read icon SVG  
  with open( "./icons/" + file, "r" ) as f:
    svg = f.read()
  
  # Populate component template
  component = str( template )
  component = component.replace( "TITLE", class_name )
  component = component.replace( "FILE", tag_name )
  component = component.replace( "CONTENT", svg )

  # Write component
  with open( "./components/icons/" + tag_name + ".js", "w" ) as f:
    f.write( component )

# Read component registry
with open( "./icons.js", "w" ) as f:
  f.write( registry )

example = ""

# Read example HTML page
# Show icons
with open( "./examples/icons.html", "r" ) as f:  
  example = f.read()

# Place markup in example page
start = example.find( "<div>" )
start = example.find( ">", start ) + 1
end = example.rfind( "</div>", start )
example = example[:start] + markup + example[end:]  

# Place component code in example page
markup = markup.replace( "<", "&lt;" )
markup = markup.replace( ">", "&gt;" )
start = example.find( "<pre>" )
start = example.find( ">", start ) + 1
end = example.rfind( "</pre>", start )
example = example[:start] + markup + example[end:]  

# Write updated example HTML page
with open( "./examples/icons.html", "w" ) as f:  
  f.write( example )
