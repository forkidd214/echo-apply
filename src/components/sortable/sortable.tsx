import React from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects,
  UniqueIdentifier,
  Active,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface BaseItem {
  id: UniqueIdentifier
}

interface SortableProps<T extends BaseItem> {
  items: T[]
  onItemOrderChange: (items: T[]) => void
  renderItem: (item: T, isActive?: boolean) => React.ReactElement
  renderActiveOverlay: (item: T) => React.ReactElement
}

export default function Sortable<T extends BaseItem>({
  items,
  onItemOrderChange,
  renderItem,
  renderActiveOverlay,
}: SortableProps<T>) {
  const [active, setActive] = React.useState<Active | null>(null)
  const activeItem = items.find((item) => item.id === active?.id)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!!over && active.id !== over.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id)
      const overIndex = items.findIndex(({ id }) => id === over.id)

      onItemOrderChange(arrayMove(items, activeIndex, overIndex))
    }

    setActive(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActive(active)}
      onDragCancel={() => setActive(null)}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2">
          {items.map((item) => (
            <Draggable key={item.id} id={item.id}>
              {renderItem && renderItem(item, item.id === active?.id)}
            </Draggable>
          ))}
        </ul>
      </SortableContext>

      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeItem && renderActiveOverlay(activeItem)}
      </DragOverlay>
    </DndContext>
  )
}

function Draggable({
  id,
  children,
}: React.PropsWithChildren<{ id: UniqueIdentifier }>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : undefined,
    cursor: 'pointer',
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </li>
  )
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
}
