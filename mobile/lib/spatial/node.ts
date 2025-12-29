// نظام العقد (Nodes) للفضاء المكاني

export type NodeType = 'concept' | 'website' | 'video' | 'image';

export interface NodeData {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  description?: string;
  content?: string; // URL أو محتوى
  color?: string;
  selected?: boolean;
}

export class SpatialNode {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  description: string;
  content: string;
  color: string;
  selected: boolean;
  dragging: boolean;
  resizing: boolean;

  constructor(data: NodeData) {
    this.id = data.id;
    this.type = data.type;
    this.x = data.x;
    this.y = data.y;
    this.width = data.width;
    this.height = data.height;
    this.title = data.title;
    this.description = data.description || '';
    this.content = data.content || '';
    this.color = data.color || this.getDefaultColor();
    this.selected = data.selected || false;
    this.dragging = false;
    this.resizing = false;
  }

  private getDefaultColor(): string {
    const colors = ['#0a7ea4', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];
    const hash = this.id.charCodeAt(0);
    return colors[hash % colors.length];
  }

  contains(worldX: number, worldY: number): boolean {
    return (
      worldX >= this.x - this.width / 2 &&
      worldX <= this.x + this.width / 2 &&
      worldY >= this.y - this.height / 2 &&
      worldY <= this.y + this.height / 2
    );
  }

  isOverResizeHandle(worldX: number, worldY: number): boolean {
    const handleSize = 30;
    return (
      worldX >= this.x + this.width / 2 - handleSize &&
      worldX <= this.x + this.width / 2 + handleSize &&
      worldY >= this.y + this.height / 2 - handleSize &&
      worldY <= this.y + this.height / 2 + handleSize
    );
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  resize(dw: number, dh: number) {
    this.width = Math.max(50, this.width + dw);
    this.height = Math.max(50, this.height + dh);
  }

  toJSON(): NodeData {
    return {
      id: this.id,
      type: this.type,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      title: this.title,
      description: this.description,
      content: this.content,
      color: this.color,
      selected: this.selected,
    };
  }

  static fromJSON(data: NodeData): SpatialNode {
    return new SpatialNode(data);
  }
}

export class NodeManager {
  private nodes: Map<string, SpatialNode> = new Map();
  private selectedNodeId: string | null = null;

  addNode(node: SpatialNode) {
    this.nodes.set(node.id, node);
  }

  removeNode(id: string) {
    this.nodes.delete(id);
    if (this.selectedNodeId === id) {
      this.selectedNodeId = null;
    }
  }

  getNode(id: string): SpatialNode | undefined {
    return this.nodes.get(id);
  }

  getAllNodes(): SpatialNode[] {
    return Array.from(this.nodes.values());
  }

  selectNode(id: string | null) {
    if (this.selectedNodeId) {
      const node = this.nodes.get(this.selectedNodeId);
      if (node) node.selected = false;
    }
    this.selectedNodeId = id;
    if (id) {
      const node = this.nodes.get(id);
      if (node) node.selected = true;
    }
  }

  getSelectedNode(): SpatialNode | null {
    return this.selectedNodeId ? this.nodes.get(this.selectedNodeId) || null : null;
  }

  findNodeAt(worldX: number, worldY: number): SpatialNode | null {
    const nodes = Array.from(this.nodes.values()).reverse();
    for (const node of nodes) {
      if (node.contains(worldX, worldY)) {
        return node;
      }
    }
    return null;
  }

  updateNodePosition(id: string, x: number, y: number) {
    const node = this.nodes.get(id);
    if (node) {
      node.x = x;
      node.y = y;
    }
  }

  updateNodeSize(id: string, width: number, height: number) {
    const node = this.nodes.get(id);
    if (node) {
      node.width = width;
      node.height = height;
    }
  }

  clear() {
    this.nodes.clear();
    this.selectedNodeId = null;
  }

  toJSON(): NodeData[] {
    return Array.from(this.nodes.values()).map(node => node.toJSON());
  }

  fromJSON(data: NodeData[]) {
    this.clear();
    data.forEach(nodeData => {
      this.addNode(new SpatialNode(nodeData));
    });
  }
}
