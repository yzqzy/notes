import fs from 'fs'
import path from 'path'

const entry = process.cwd()
const output = path.resolve(entry, 'docs')

interface MdNode {
  name: string;
  path: string;
  mark: boolean;
  parent?: MdNode,
  children?: MdNode[]
}

const cleanDocs = () => {
  // TODO
}

const buildModule = (entry: string): MdNode => {
  let ans: MdNode 
  
  const cache: MdNode[] = []

  const isMarkdown = (path: string) => path.includes('README.md')
  const isValid = (dir: string) => !['.git', '.vscode', 'node_modules', 'build', 'docs'].some(_ => dir.includes(_))

  const getFileName = (entry: string) => entry.split(path.sep).at(-1) as string

  const getModules = (entry: string, parent?: MdNode) => {
    const module: MdNode = {
      name: getFileName(entry),
      path: entry,
      mark: false,
      parent,
      children: []
    }
      
    const dirs = fs.readdirSync(entry)
  
    dirs.forEach(dir => {
      const _entry = path.resolve(entry, dir)
      const stat = fs.statSync(_entry)
  
      if (stat.isDirectory() && isValid(_entry)) {
        module.children?.push(getModules(_entry, module))
        return
      }
      
      if(isMarkdown(_entry)) {
        module.mark = true
        module.children?.push({
          name: dir,
          mark: false,
          path: _entry
        })
        return
      }
      
      cache.push(module)
    })

    return module
  }

  ans = getModules(entry)

  cache.forEach(m => {
    while (m && m.parent && !m.mark) {
      m.parent.children = m.parent.children?.filter((item) => item.path != m.path)
      m = m.parent
    }
  })
  
  return ans
}

interface Sidebar {
  text: string;
  link?: string;
  items?: Sidebar[]
}

const generateDocs = (module: MdNode) => {
  const sidebar: Sidebar = {
    text: module.name
  }

  const currentDir = module.path.replace(entry, output)

  if (Array.isArray(module.children)) {
    if (!fs.existsSync(currentDir)) {
      fs.mkdirSync(currentDir)
    }

    const items = module.children.map(generateDocs)

    if (items.length) {
      sidebar.items = items
    }
  } else {
    fs.copyFileSync(module.path, currentDir.replace(/README.md/, 'index.md'))
    sidebar.link = module.path
      .replace(entry, '')
      .replace(/\\/g, '/')
      .replace(/README.md/, 'index.md')
  }

  return sidebar
}

const genrateSidebarConfig = (sideber: Sidebar) => {
  let config = sideber.items

  // remove root 
  config = config?.filter(node => node.text !== 'README.md')

  const clear = (_sidebar: Sidebar) => {
    const child = _sidebar.items && _sidebar.items[0]

    if (
      _sidebar.items?.length == 1 &&
      child && child.text === 'README.md'
    ) {
      _sidebar.link = child.link
      return;
    }
    
    _sidebar.items?.forEach(clear)
  }

  clear(sideber)

  fs.writeFileSync(
    path.resolve(output, '.vitepress/sidebar.json'),
    JSON.stringify(config)
  )
}

const buildEntry = (entry: string) => {
  cleanDocs()

  const modules = buildModule(entry)
  const sidebar = generateDocs(modules)

  genrateSidebarConfig(sidebar)
}


buildEntry(entry)
