import fs from 'fs'
import path from 'path'

const entry = process.cwd()
const output = path.resolve(entry, 'docs')

const cleanDocs = () => {
  
}

interface MdNode {
  name: string;
  path: string;
  parent?: MdNode,
  children?: MdNode[]
}

const isMarkdown = (path: string) => path.includes('README.md')
const isValid = (dir: string) => !['.git', '.vscode', 'node_modules', 'build'].some(_ => dir.includes(_))

const getFileName = (entry: string) => entry.split(path.sep).at(-1) as string

const getModules = (entry: string, parent?: MdNode): MdNode => {
  const module: MdNode = {
    name: getFileName(entry),
    path: entry,
    parent,
    children: []
  }
    
  const dirs = fs.readdirSync(entry)

  dirs.forEach(dir => {
    const _entry = path.resolve(entry, dir)
    const stat = fs.statSync(_entry)

    if (stat.isDirectory() && isValid(_entry)) {
      module.children?.push(getModules(_entry, module))
    } else if (isMarkdown(_entry)) {
      module.children?.push({
        name: dir,
        path: _entry
      })
    } else {
      // TODO
    }
  })

  return module
}

interface Sidebar {
  text: string;
  link?: string;
  items?: Sidebar[]
}

const generateDocs = (module: MdNode) => {
  let sidebar = {
    text: module.name
  }

  if (Array.isArray(module.children)) {
    console.log(module.path.replace(entry, output))

    // fs.mkdirSync(module.path.replace(entry, output))

    sidebar = Object.assign(sidebar, {
      items: module.children.map(generateDocs)
    })
  } else {
    sidebar = Object.assign(sidebar, {
      link: module.path.replace(entry, '').replace('\\', '/')
    })
  }

  return sidebar
}

const genrateSidebarConfig = (node: Sidebar) => {
  
}

const buildEntry = (entry: string) => {
  cleanDocs()

  const modules = getModules(entry)
  const sidebar = generateDocs(modules)

  // console.log(sidebar)

  // genrateSidebarConfig(sidebar)
}


buildEntry(entry)
